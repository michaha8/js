const getAllMessages = (res)=>(
    res.send('Get All Messages')

)
const addNewMessage=(res)=>(
    res.send('Add a new Message')
)


export={getAllMessages,addNewMessage}