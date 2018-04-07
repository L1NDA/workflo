var divvyNotes;
var divvyLeafs;

// initialize
function initialize() {

    let initNotes = chrome.storage.sync.get('Divvy Notes', function(result){});
    // let divvyNotes = localStorage.getItem('Divvy Notes');;

    // let weatherWidget = localStorage.getItem('weatherWidget');

    chrome.storage.sync.get('Divvy Leafs', function(result){
      console.log("result", result);

      var bytes;
      chrome.storage.sync.getBytesInUse('Divvy Leafs', function(res){
        bytes = res;
        console.log(bytes);

        if (bytes === 0) {
          divvyLeafs = [
            {
              leaf: 'one',
              content: ''
            },
            {
              leaf: 'two',
              content: ''
            },
            {
              leaf: 'three',
              content: ''
            },
            {
              leaf: 'four',
              content: ''
            }];
        } else {
          divvyLeafs = result[["Divvy Leafs"]];
        }

        console.log("initleafs", divvyLeafs);
        // let initLeafs = localStorage.getItem('Divvy Leafs');;
        // let weatherWidget = localStorage.getItem('weatherWidget');

        render();

      });
    });

}

function render() {

  // listens for typing on the body text, and stores info if clicked
  let leafSelector = document.querySelectorAll(".leaf-text");

  leafSelector.forEach(function(leaf) {
    console.log("divvyleafs", divvyLeafs);
    let leafFinder = divvyLeafs.find(leafMap => leafMap.leaf === leaf.id);
    leaf.value = leafFinder.content;
    leaf.addEventListener('keyup', function(e) {
			let leafValue = leaf.value;
      let leafId = leaf.id;
			let targetLeaf = divvyLeafs.find(leaf => leaf.leaf === leafId);
			targetLeaf.content = leafValue;
      chrome.storage.sync.set({['Divvy Leafs']: divvyLeafs}, function(result){});
      // localStorage.setItem('Divvy Leafs', JSON.stringify(divvyLeafs));
    }
  )});

}

function unsplash() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.unsplash.com", true);
  xhr.setRequestHeader("Authorization","Client-Id dc1799e7475839af597b97d8ca8b81529b9a107383bca66e7b79a4e8802ec34b")
  xhr.send();
  xhr.onreadystatechange = function()
  {
      if(xhr.readyState == 4 && xhr.status == 200)
      {
              //debugger;
              alert("Logged in");
              // flag = 1;
              // _callBack(xhr, xhr.readyState);
              var result = xhr.responseText;
              console.log(result);
      }
  }
}

initialize();
// unsplash();
