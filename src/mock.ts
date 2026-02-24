import { User, Order, CategoryEnum, Product } from './types';

export const Products: Product[] =  [
  {
    "id":1,
    "title":"Essence Mascara Lash Princess",
    "category": CategoryEnum.Beleza,
    "price":9.99,
    "image":"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    "quantity":99,
    "status":"Entregue"
  },
  {
    "id":2,
    "title":"Eyeshadow Palette with Mirror",
    "category": CategoryEnum.Beleza,
    "price":19.99,
    "image":"https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    "quantity":34,
    "status":"Cancelado"
  },
  {
    "id":3,
    "title":"Powder Canister",
    "category":CategoryEnum.Beleza,
    "price":14.99,
    "image":"https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    "quantity":89,
    "status":"Cancelado"
  },
  {
    "id":4,
    "title":"Red Lipstick",
    "category":CategoryEnum.Beleza,
    "price":12.99,
    "image":"https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    "quantity":91,
    "status":"Cancelado"
  },
  {
    "id":5,
    "title":"Red Nail Polish",
    "category":CategoryEnum.Beleza,
    "price":8.99,
    "image":"https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
    "quantity":79,
    "status":"Entregue"
  },
  {
    "id":6,
    "title":"Calvin Klein CK One",
    "category":CategoryEnum.Eletrônicos,
    "price":49.99,
    "image":"https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
    "quantity":29,
    "status":"A caminho"
  },
  {
    "id":7,
    "title":"Chanel Coco Noir Eau De",
    "category":CategoryEnum.Eletrônicos,
    "price":129.99,
    "image":"https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    "quantity":58,
    "status":"A caminho"
  },
  {
    "id":8,
    "title":"Dior J'adore",
    "category":CategoryEnum.Eletrônicos,
    "price":89.99,
    "image":"https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
    "quantity":98,
    "status":"Entregue"
  },
  {
    "id":9,
    "title":"Dolce Shine Eau de",
    "category":CategoryEnum.Eletrônicos,
    "price":69.99,
    "image":"https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
    "quantity":4,
    "status":"Cancelado"
  },
  {
    "id":10,
    "title":"Gucci Bloom Eau de",
    "category":CategoryEnum.Eletrônicos,
    "price":79.99,
    "image":"https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
    "quantity":91,
    "status":"Entregue"
  },
  {
    "id":11,
    "title":"Annibale Colombo Bed",
    "category":CategoryEnum.Casa,
    "price":1899.99,
    "image":"https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
    "quantity":88,
    "status":"A caminho"
  },
  {
    "id":12,
    "title":"Annibale Colombo Sofa",
    "category":CategoryEnum.Casa,
    "price":2499.99,
    "image":"https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
    "quantity":60,
    "status":"Entregue"
  },
  {
    "id":13,
    "title":"Bedside Table African Cherry",
    "category":CategoryEnum.Casa,
    "price":299.99,
    "image":"https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
    "quantity":64,
    "status":"A caminho"
  },
  {
    "id":14,
    "title":"Knoll Saarinen Executive Conference Chair",
    "category":CategoryEnum.Casa,
    "price":499.99,
    "image":"https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
    "quantity":26,
    "status":"Cancelado"
  },
  {
    "id":15,
    "title":"Wooden Bathroom Sink With Mirror",
    "category":CategoryEnum.Casa,
    "price":799.99,
    "image":"https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
    "quantity":7,
    "status":"Entregue"
  },
  {
    "id":16,
    "title":"Apple",
    "category":CategoryEnum.Esporte,
    "price":1.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
    "quantity":8,
    "status":"Cancelado"
  },
  {
    "id":17,
    "title":"Beef Steak",
    "category":CategoryEnum.Esporte,
    "price":12.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
    "quantity":86,
    "status":"A caminho"
  },
  {
    "id":18,
    "title":"Cat Food",
    "category":CategoryEnum.Esporte,
    "price":8.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
    "quantity":46,
    "status":"Entregue"
  },
  {
    "id":19,
    "title":"Chicken Meat",
    "category":CategoryEnum.Moda,
    "price":9.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
    "quantity":97,
    "status":"A caminho"
  },
  {
    "id":20,
    "title":"Cooking Oil",
    "category":CategoryEnum.Moda,
    "price":4.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
    "quantity":10,
    "status":"Cancelado"
  },
  {
    "id":21,
    "title":"Cucumber",
    "category":CategoryEnum.Moda,
    "price":1.49,
    "image":"https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
    "quantity":84,
    "status":"A caminho"
  },
  {
    "id":22,
    "title":"Dog Food",
    "category":CategoryEnum.Música,
    "price":10.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
    "quantity":71,
    "status":"A caminho"
  },
  {
    "id":23,
    "title":"Eggs",
    "category":CategoryEnum.Música,
    "price":2.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
    "quantity":9,
    "status":"Cancelado"
  },
  {
    "id":24,
    "title":"Fish Steak",
    "category":CategoryEnum.Música,
    "price":14.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
    "quantity":74,
    "status":"Entregue"
  },
  {
    "id":25,
    "title":"Green Bell Pepper",
    "category":CategoryEnum.Música,
    "price":1.29,
    "image":"https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
    "quantity":33,
    "status":"Entregue"
  },
  {
    "id":26,
    "title":"Green Chili Pepper",
    "category":CategoryEnum.Música,
    "price":0.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
    "quantity":3,
    "status":"A caminho"
  },
  {
    "id":27,
    "title":"Honey Jar",
    "category":CategoryEnum.Esporte,
    "price":6.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
    "quantity":34,
    "status":"A caminho"
  },
  {
    "id":28,
    "title":"Ice Cream",
    "category":CategoryEnum.Esporte,
    "price":5.49,
    "image":"https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
    "quantity":27,
    "status":"Entregue"
  },
  {
    "id":29,
    "title":"Juice",
    "category":CategoryEnum.Esporte,
    "price":3.99,
    "image":"https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
    "quantity":50,
    "status":"Entregue"
  },
  {
    "id":30,
    "title":"Kiwi",
    "category":CategoryEnum.Esporte,
    "price":2.49,
    "image":"https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
    "quantity":99,
    "status":"Cancelado"
  }
]

export const OrdersData: Order[] = [
	{
		id: 432423423,
		date: '17 de fevereiro',
		paymentMethod: 'Pix',
		paymentStatus: 'approved',
		shipping: {
			address: 'Rua padre duarte, 125',
			city: 'Araraquara, SP',
			price: 0
		},
		totalPrice: 30,
		products: [
			Products[0],
			Products[1],
		]
	},
	{
		id: 98977,
		date: '15 de fevereiro',
		paymentMethod: 'Cartão de crédito',
		paymentStatus: 'approved',
		shipping: {
			address: 'Rua padre duarte, 125',
			city: 'Araraquara, SP',
			price: 20
		},
		totalPrice: 15,
		products: [
			Products[3],
			Products[10],
			Products[11],
			Products[22]
		]
	},
	{
		id: 3232,
		date: '14 de janeiro',
		paymentMethod: 'Pix',
		paymentStatus: 'pending',
		shipping: {
			address: 'Avenida São Carlos, 223',
			city: 'São Carlos, SP',
			price: 20
		},
		totalPrice: 50,
		products: [
			Products[7],
			Products[8],
			Products[29],
			Products[3]
		]
	},
	{
		id: 666554,
		date: '12 de janeiro',
		paymentMethod: 'Pix',
		paymentStatus: 'not_approved',
		shipping: {
			address: 'Avenida Matarazzo, 167',
			city: 'São Paulo, SP',
			price: 20
		},
		totalPrice: 76,
		products: [
			Products[15],
			Products[18],
			Products[27],
		]
	},
];

export const UserData: User = {
	name: 'João da Silva',
	cpf: '404.999.423.99-99',
	nickname: 'João',
	address: 'Rua padre duarte, 289',
	email: 'joaosilva@gmail.com',
	phone: '(11) 99999-9999',
	password: '********',
};