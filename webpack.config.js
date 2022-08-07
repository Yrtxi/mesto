// подключаем path (для преобразования относительного пути в абсолютный)
const path = require("path");
//плагин для работы c HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
//плагин для очистки dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//плагин для объединения в один css-файл
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //точка входа
  entry: { main: "./src/pages/index.js" },
  //точка выхода
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  //режим разработчика
  mode: "development",
  //настройки локального сервера
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,

    open: true,
  },
  module: {
    //массив правил
    rules: [
      //правило для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      // правило для обработки файлов(картинки и шрифты)
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      // правило для обработки CSS-файлов
      {
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  //массив плагинов
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
