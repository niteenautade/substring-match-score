var natural = require('natural')
var tokenizer = new natural.WordTokenizer();

module.exports = function(source,search,options = { method : "avg" }){
	var tokenizedSource = tokenizer.tokenize(source)
	var tokenizedSearch = tokenizer.tokenize(search)

	var match = []
	for(var i=0;i<tokenizedSearch.length;i++){
		var maxDistance = 0
		var maxIndex = 0
		for(var j=maxIndex;j<tokenizedSource.length;j++){
			let distance = natural.JaroWinklerDistance(tokenizedSearch[i],tokenizedSource[j])
			if( distance > maxDistance){
				maxDistance = distance
				maxIndex = j
			}
		}
		match.push(maxDistance)	
	}

	if(options.method == "avg"){
		return match.reduce((acc,a)=>{return acc+a},0)/match.length
	}
	if(options.method == "max"){
		return Math.max(...match)
	}
	if(options.method == "min"){
		return Math.min(...match)
	}

}