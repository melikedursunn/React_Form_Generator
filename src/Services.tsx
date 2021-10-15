import axios from "axios";

const service = axios.create({
    baseURL:'https://www.jsonbulut.com/json/',
})

const ref= '16638724aadccaea33841962014b597e'

export function formAxios() {

    const prm = {
        ref: ref,
        formId: 47
    }
    return service.get('forms.php', {params:prm} );
    
}