# vhtml-cli-template

## 开始开发新组件

先请在 `src/componets` 中创建组件目录，目录全小写，使用 `-` 分隔，比如 `text-viewer` ，需要至少包含如下几个文件：

* `index.vue` 入口文件
* `package.json` 包描述文件
* `example/index.vue` 示例页面

`package.json` 中包含如下字段：

* `name` 可选，指定包名，如 `text-viewer`，请与目录包保持一致，目前没有
* `version` 必须，版本号将出现在打包构建结果的目录中
* `description` 可选，会显示在调试页面中自定义组件列表的说明栏
* `main` 可选，指定入口文件，如果不指定，则默认为 index.vue

## 开发调试

在根目录中执行：

```sh
npm run dev
```

然后浏览器打开 [http://localhost:9846/](http://localhost:9846/) ，即可看到 `src/components` 中的组件列表，通过点击示例页的链接，可以在页面中调试。

## 组件构建

开发完成后，可以使用如下的命令来构建：

```sh
npm run component text-viewer
```

之后，文件会被放入 `public/static/text-viewer_0.0.6/` 目录中。使用 UMD 模式打包。

## 构建结果

构建结果存放在 `public/static/<component-name>_<component-version>/` 目录中，为单 `index.js` 文件，如 `public/static/text-viewer_0.0.6/index.js` 。该文件头部如下：

```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("text-viewer", [], factory);
	else if(typeof exports === 'object')
		exports["text-viewer"] = factory();
	else
		root["text-viewer"] = factory();
})(this, function() {
```

文件不压缩。
