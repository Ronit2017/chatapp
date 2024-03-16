import Conversation from "../models/conversation.model.js";
import Message  from "../models/message.model.js";

export const sendMessage = async (req , res) => {
    try {
        const {message} = req.body;
        const {id: receiveId }= req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId , receiveId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId , receiveId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiveId,
            message,
        });

        if(newMessage){
            conversation.message.push(newMessage._id);
        }
        await Promise.all([conversation.save() , newMessage.save()]);
        res.json({message:"successfully", newMessage});


    } catch (error) {
     console.log("Error is sendMessage:" , error.message)
     res.status(500).json({error:"internal server error"})   
    }
}

export const getMessage = async (req ,res) => {
    try {
        const {id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId , userToChatId]},
        }).populate("messages");
        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error is getMessage:" , error.message)
        res.status(500).json({error:"internal server error"})   
    }
}