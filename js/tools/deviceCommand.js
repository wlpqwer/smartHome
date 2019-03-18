export default function deviceCommand (currentCommand) {
    let resultCommand = '';
    switch (currentCommand){
        case 'FANS_LIGHT_SWITCH':
            resultCommand= "风扇灯开关";
            break;
        case 'FANS_SWITCH':
            resultCommand="风扇开关";
            break;
    }
    return resultCommand;
};


