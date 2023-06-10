// const translate = require("translate");
import translate from "translate";
translate.engine = "yandex";
translate.key = "trnsl.1.1.20230610T101022Z.df0eadfa9b801c0f.644b09efaca21b50d5ca109d4934eced8ae74262";

const getTranlatedQuestion = async (req,res)=>{
    const {text,language} = req.body;
    try {
        const translatedText = await translate(text, { to: language });
        res.status(200).send({translatedText});
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

export default getTranlatedQuestion;