import Room from "./model/model.js";


const createRoom = async (req, res) => {
    try{
        const {roomNumber, capacity, rent} = req.body;

        let isExist = await Room.findOne({where:{
            roomNumber:roomNumber
        }});

        if(isExist){return res.status(400).send("roomNumber already exist please choose different roomNumber");}

        const details = await Room.create({
            roomNumber:roomNumber,
            capacity:capacity,
            rent:rent
        });

        return res.status(201).json({message:"room been created", details: details});
    } catch(err){
        console.log(err);
        return res.status(500).send("some error occured");
    }



};




export {
    createRoom
};