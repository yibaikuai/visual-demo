export interface OtherValue {
	nowConfirm: number;
	confirmAdd: number;
	dead: number;
	heal: number;
	zero: number;
}

export interface RootObject {
	name: string;
	value: number[];
	otherValue: OtherValue;
}

export interface ChinaDaily {
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	heal: number;
	healRate: string;
	localConfirmH5: number;
	dead: number;
	deadRate: string;
	y: string;
	noInfect: number;
	localConfirm: number;
	local_acc_confirm: number;
	confirm: number;
	suspect: number;
	nowConfirm: number;
	date: string;
}

export interface chinaDailyAdd {
	localinfectionadd: number;
	date: string;
	confirm: number;
	dead: number;
	heal: number;
	importedCase: number;
	infect: number;
	suspect: number;
	localConfirmadd: number;
	deadRate: string;
	healRate: string;
	y: string;
}

export interface pieData{
	name:string,
	value:Number
}