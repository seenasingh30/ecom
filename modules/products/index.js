const { Router } = require("express")
const router = Router()
const controller = require("./controller")

router.get("/:id?",controller.get)
router.post("/",controller.create)
router.put("/:id?",controller.update)
router.delete("/:id?",controller.remove)

module.exports = router;