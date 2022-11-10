const getAllMessages = (req,res,next)=>(
    res.send('Get All Messages')

)
const addNewMessage=(req,res,next)=>(
    res.send('Add a new Message')
)


module.exports={getAllMessages,addNewMessage}