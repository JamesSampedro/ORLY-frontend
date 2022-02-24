export function InputHandler(state,setter,key,value){
    return setter({...state,[key]:value})
};