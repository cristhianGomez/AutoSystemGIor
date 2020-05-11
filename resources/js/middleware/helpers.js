import Noty from "noty";

export function message(text,type){
	new Noty({
		text: text,
		type: type,
		timeout: 3000,
		}).show();
}