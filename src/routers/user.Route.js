const router = require('express').Router();
const userController = require('../controllers/user.Controller')

router.post("/create",userController.createAuser)
router.post("/login",userController.loginAuser)
router.get("/list",userController.getAllUser)
router.get("/hostlist",userController.getAllHost)
router.get("/:id",userController.getAUser)
router.put("/bulk-update",userController.userBulkUpdate)
router.delete("/bulk-delete",userController.userBulkDelete)
router.put("/:id",userController.updateAuser)
router.delete("/:id",userController.userDeleteById);
router.post('/delete-user/:id', userController.deleteGuestUser)
router.post('/delete-host/:id', userController.deleteHost)


module.exports = router;
