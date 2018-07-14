import { 
	pervoe_sentyabrya,
	avgust,
	vpolgolosa 
} from './authors/brodskiy';

import { 
	a_vse_taki,
	a_vi_mogli_bi,
	vam
} from './authors/mayakovskiy';

import { 
	avgust as avgust_pasternak,
	bolezni_zemli,
	bit_znamenitim_nekrasivo
} from './authors/pasternak';

import { 
	voshodish_ti,
	osennyaya_volya
} from './authors/blok';

export default [
	{
		name: 'Бродский',
		isFavorite: true,
		_id: 0,
		avatar: require('./images/brodskiy.jpg'),
		verses: [
			{
				_id: 0,
				title: "1 сентября 1939 года", 
				text: pervoe_sentyabrya
			},
			{
				_id: 1,
				title: "Август",
				text: avgust
			},
			{
				_id: 2,
				title: "Вполголоса - конечно, не во весь...",
				text: vpolgolosa
			}
		]
	},
	{
		name: 'Маяковский',
		isFavorite: false,
		_id: 1,
		avatar: require('./images/mayakovskiy.jpg'),
		verses: [
			{
				_id: 0,
				title: "A все таки",
				text: a_vse_taki 
			},
			{
				_id: 1,
				title: "А вы могли бы?",
				text: a_vi_mogli_bi
			},
			{
				_id: 2,
				title: "Вам!",
				text: vam
			}
		]
	},
	{
		name: 'Высоцкий',
		isFavorite: false,
		_id: 2,
		avatar: require('./images/visotsky.jpg'),
		verses: [
			{
				_id: 0,
				title: "В сон мне — жёлтые огни",
				text: "",
			},
			{
				_id: 1,
				title: "Баллада о любви",
				text: ""
			},
		]
	},
	
	{
		name: 'Пастернак',
		isFavorite: true,
		_id: 3,
		avatar: require('./images/pasternak.jpg'),
		verses: [
			{
				_id: 0,
				title: "Август",
				text: avgust_pasternak
			},
			{
				_id: 1,
				title: "Болезни Земли",
				text: bolezni_zemli
			},
			{
				_id: 2,
				title: "Быть знаменитым некрасиво...",
				text: bit_znamenitim_nekrasivo
			}
		]
	},
	{
		name: 'Блок',
		isFavorite: false,
		_id: 4,
		avatar: require('./images/block.jpg'),
		verses: [
			{
				_id: 0,
				title: "Восходишь ты, что строгий день",
				text: voshodish_ti
			},
			{
				_id: 1,
				title: "Осенняя воля",
				text: osennyaya_volya
			}
		]
	}
]