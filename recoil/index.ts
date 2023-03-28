import {atom} from "recoil"

interface Item {
    _id:string;
    singer : string;
    song:string;
    count:number;
    image:string;
    lyrics:Array<string>;
    meaning:string;
}
interface Search{
    search:string;
    search_result:Array<object>;
    search_mode:boolean;
}
interface Items{
    recently:Array<Item>;
    popular:Array<Item>;
}
export const searchState = atom<Search>({
    key:"searchState",
    default:{
        search:"",
        search_result:[],
        search_mode:false
    }
})

export const itemState = atom<Items>({
    key:"itemState",
    default:{
        recently:[],
        popular:[],
    }
})
export const loadingState = atom<boolean>({
    key:"loadingState",
    default:false
})
//사용법
// import { useRecoilState } from 'recoil';
// import { nameState } from '../components/states';


// const [name, setNameState] = useRecoilState(nameState);

// const updateName = e => {
//   setNameState(e.target.value);
// };