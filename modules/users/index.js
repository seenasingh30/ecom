const { Router } = require("express")
const router = Router()
const controller = require("./controller")
const auth = require("../../middleware/auth")

router.get("/:id?",auth,controller.getUsers)
router.post("/",auth,controller.createUser)
router.put("/:id?",auth,controller.updateUser)
router.delete("/:id?",auth,controller.deleteUser)
router.post("/login",controller.login)

module.exports = router;