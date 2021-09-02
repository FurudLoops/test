var mongoose = require("mongoose");
mongoose.connect = mongoose.Schema;
const academicsCategory = [{
    categoryId: '1',
    categoryName: 'Academics',
    
  },{
    categoryId: '2',
    categoryName: 'Business'
    
  },{
    categoryId: '3',
    categoryName: 'IT & Software'
    
  },{
    categoryId: '4',
    categoryName: 'Health & Fitness'
    
  },{
    categoryId: '5',
    categoryName: 'Lifestyle'
    
  },{
    categoryId: '6',
    categoryName: 'Music'
    
  },{
    categoryId: '7',
    categoryName: 'NFT'
    
  },{
    categoryId: '8',
    categoryName: 'Entertainment'
    
  },{
    categoryId: '9',
    categoryName: 'Gaming'
    
  },{
    categoryId: '10',
    categoryName: 'News'
    
  },{
    categoryId: '11',
    categoryName: 'Research'
    
  }
];

  new Model(academicsCategory).save();
  var Categorie = mongoose.Model("Categorie", academicsCategory);
  

  
