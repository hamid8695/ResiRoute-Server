const User = require("../models/user.Modal");

exports.updateUser = async(id,data)=>{
    // const result =await User.updateOne({_id: id},{ $set: data},{
    //     runValidators: true
    // })
    const user = await User.findById(id);
    const result = await user.set(data).save()
    return result;
}

exports.userBulkUpdate = async(data)=>{
    // same change
    // const result =await User.updateMany({_id: data.ids},data.data,{
    //     runValidators: true
    // })

    // different change
    const users = [];
    data.ids.forEach(user => {
        users.push(User.updateOne({_id: user.id}, user.data))
    });

    const result = await Promise.all(users)
   
    return result;
}

exports.userDeleteByIdService=async(id)=>{
    const result = await User.deleteOne({_id: id});
    return result;
}

exports.userBulkDeleteServies=async(ids)=>{
    const result = await User.deleteMany({_id: ids});
    return result;
}