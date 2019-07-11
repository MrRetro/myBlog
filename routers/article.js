/**
 * User: retro.
 * Time: 11/4/19
 */
const router = require('koa-router')()
const model = require('../db/Article.js')

// post 发表文章
router.post('/article/add', async ctx => {
  let {
    TypeID = 1,
    ArticleName,
    ArticleDesc = '',
    ArticleContent,
    UpLoadID = '',
    SortID = 1,
    IsShow = 1,
    ViewCount = 0,
    MasterID = 1,
    AddDate = new Date(),
    ReleaseDate = new Date(),
    iLanguage = 1,
    PageTitle = '',
    Keywords = '',
    Description = ''
  } = ctx.request.body

  console.log(
    TypeID,
    ArticleName,
    ArticleDesc,
    ArticleContent,
    UpLoadID,
    SortID,
    IsShow,
    ViewCount,
    MasterID,
    AddDate,
    ReleaseDate,
    iLanguage,
    PageTitle,
    Keywords,
    Description
  )

  await model.insertData([
    TypeID,
    ArticleName,
    ArticleDesc,
    ArticleContent,
    UpLoadID,
    SortID,
    IsShow,
    ViewCount,
    MasterID,
    AddDate,
    ReleaseDate,
    iLanguage,
    PageTitle,
    Keywords,
    Description
  ]).then(() => {
    ctx.body = {
      code: 200,
      message: '发表文章成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: '发表文章失败' + err
    }
  })
})

// post 编辑文章
router.post('/article/edit', async ctx => {
  let {
    ArticleID,
    TypeID,
    ArticleName,
    ArticleContent,
    ReleaseDate = new Date()
  } = ctx.request.body

  console.log(
    ArticleID,
    TypeID,
    ArticleName,
    ArticleContent,
    ReleaseDate
  )

  await model.updateData([
    ArticleName,
    TypeID,
    ArticleContent,
    ReleaseDate,
    ArticleID
  ]).then(() => {
    ctx.body = {
      code: 200,
      message: '编辑文章成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: '编辑文章失败' + err
    }
  })
})

// post 编辑文章 字段+1
router.post('/article/edit/up', async ctx => {
  let {
    ArticleID
  } = ctx.request.body

  console.log(
    ArticleID
  )

  await model.updateDataUp([
    ArticleID
  ]).then(() => {
    ctx.body = {
      code: 200,
      message: '编辑文章字段成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: '编辑文章字段失败' + err
    }
  })
})

// get 获取所有
router.get('/article', async ctx => {
  await model.queryAllData().then(res => {
    ctx.body = res
  }).catch(() => {
    ctx.body = 'error'
  })
})

// get 获取所有 根据typeid
router.get('/article/type/:id', async ctx => {
  await model.queryAllData(ctx.params.id).then(res => {
    ctx.body = res
  }).catch(() => {
    ctx.body = 'error'
  })
})

// get 获取所有 - 通过id
router.get('/article/:id', async ctx => {
  await model.queryDataById(ctx.params.id).then(res => {
    ctx.body = res
  }).catch(() => {
    ctx.body = 'error'
  })
})

// get 获取所有 - 通过名字
router.get('/article/name/:name', async ctx => {
  await model.queryData(ctx.params.name).then(res => {
    ctx.body = res
  }).catch(() => {
    ctx.body = 'error'
  })
})

// 删除
router.post('/article/del/:id', async ctx => {
  model.deleteData(ctx.params.id)
    .then(() => {
      ctx.body = {
        code: 200,
        message: '删除文章成功'
      }
    }).catch(() => {
      ctx.body = {
        code: 500,
        message: '删除文章失败'
      }
    })
})

module.exports = router
