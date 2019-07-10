# vhtml-cli-template

## 开始开发新组件

先请在 `src/componets` 中创建组件目录，目录全小写，使用 `-` 分隔，比如 `text-viewer` ，需要至少包含如下几个文件：

* `index.vue` 入口文件
* `package.json` 包描述文件
* `example/index.vue` 示例页面

`package.json` 中至少要包含如下字段：

* `name`
* `version`
* `main` 指定入口文件，如果不指定，则默认为 index.vue

## 开发调试

在根目录中执行：

```sh
npm run dev
```

然后浏览器打开 [http://localhost:8964/](http://localhost:8964/) ，即可看到 `src/components` 中的组件列表，通过点击示例页的链接，可以在页面中调试。

## 组件构建

开发完成后，可以使用如下的命令来构建：

```sh
npm run component text-viewer
```

之后，文件会被放入 `public/static/text-viewer/` 目录中。使用 UMD 模式打包。
