const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')
const { verifyToken } = require('../helpers/jwt.helper')
const Wallet = require('../model/Wallet.model')

function ResultModel(status, message, data = null, error = null) {
   return {
      status: status,
      message: message,
      data: data,
      error: error,
   }
}
//get all wallet
router.route('/').get((req, res) => {
   verifyToken(req, res, (decoded) => {
      Wallet.find()
         .sort({ _id: -1 })
         .then((wallet) => res.json(wallet))
         .catch((err) => res.status(400).json('Error:', +err))
   })
})

//tạo mới ví tiền
router.route('/create').post((req, res) => {
   const userId = req.body.userId
   const walletName = req.body.walletName
   const walletMoney = req.body.walletMoney
   const newWallet = new Wallet({ userId, walletName, walletMoney })

   verifyToken(req, res, (decoded) => {
      newWallet
         .save()
         .then(() => res.json(ResultModel('success', 'Tạo mới ví tiền thành công', newWallet)))
         .catch((err) => res.status(400).json({ error: err }))
   })
})

//lấy ví tiền theo user id
router.route('/getWallet/:userId').get((req, res) => {
   const userId = req.params.userId
   verifyToken(req, res, (decoded) => {
      Wallet.find({ userId })
         .sort({ _id: -1 })
         .then((wallet) => {
            if (wallet.length > 0) {
               res.json(ResultModel('success', 'Lấy ví tiền thành công', wallet))
            } else {
               res.json(ResultModel('error', 'Bạn không có ví tiền, vui lòng tạo mới'))
            }
         })
         .catch((err) => res.status(400).json({ error: err }))
   })
})

//update thông tin ví tiền
router.route('/updateWallet').post((req, res) => {
   const { _id, walletName, walletMoney } = req.body
   verifyToken(req, res, (decoded) => {
      Wallet.findOneAndUpdate(
         { _id },
         { walletName, walletMoney },
         {
            new: true, // return updated doc
            runValidators: true, // validate before update
         },
      )
         .then((wallet) => {
            if (wallet) {
               res.json(ResultModel('success', 'Cập nhật ví tiền thành công', wallet))
            } else {
               res.json(ResultModel('error', 'Cập nhật ví tiền thất bại', wallet))
            }
         })
         .catch((err) => res.status(400).json(ResultModel('error', 'Cập nhật ví tiền thất bại', null, err)))
   })
})

//xóa ví tiền
router.route('/deleteWallet/:_id').get((req, res) => {
   const _id = req.params._id
   verifyToken(req, res, (decoded) => {
      Wallet.findOneAndRemove({ _id })
         .then((wallet) => {
            if (wallet) {
               res.json(ResultModel('success', 'Xóa ví tiền thành công', wallet))
            } else {
               res.json(ResultModel('error', 'Xóa ví tiền thất bại', wallet))
            }
         })
         .catch((err) => res.status(400).json({ error: err }))
   })
})

//chuyển tiền sang ví khác
router.route('/updateWallet').post((req, res) => {
   //id2: id wallet muốn chuyển tiền đến
   const { id1, id2, moneyTransfer } = req.body
   verifyToken(req, res, (decoded) => {
      try {
         Wallet.findOne({ _id: id1 }).then((wallet1) => {
            const moneyAfterTransfer1 = wallet1.walletMoney - moneyTransfer
            Wallet.findByIdAndUpdate(id1, { walletMoney: moneyAfterTransfer })
         })
         Wallet.findOne({ _id: id2 }).then((wallet2) => {
            const moneyAfterTransfer2 = wallet2.walletMoney + moneyTransfer
            Wallet.findByIdAndUpdate(id1, { walletMoney: moneyAfterTransfer2 })
         })
         res.json(ResultModel('success', 'Chuyển tiền thành công'))
      } catch (error) {
         res.status(400).json(ResultModel('error', 'Chuyển tiền thất bại'))
      }
   })
})
module.exports = router
