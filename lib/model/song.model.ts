import mongoose, { Schema, models } from "mongoose";
const SongSchema = new Schema({
    singer:{//가수
        type:String
    },
    song:{//노래이름
        type:String
    },
    key:{//키값
        type:String,
        unique:true
    },
    image:{//앨범이미지
        type:String
    },
    count:{//조회수
        type:Number,
        default:0
    },
    lyrics:{//가사
        type:Array
    },
    meaning:{//가사의 뜻
        type:String
    }
});

const Song = mongoose.models.Song ||  mongoose.model("Song", SongSchema);

export default Song;