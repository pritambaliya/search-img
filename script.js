let key = 'IYwCjpfDebTQkeaLp-PmTODotrgWTWB2P4hNLIJukjA';
let url = 'https://api.unsplash.com/search/photos';
const errors = document.getElementById('error')
let cquery = '';
let cpage = 1;

let btn = document.getElementById('btn');
let lbtn = document.getElementById('loadbtn');

btn.addEventListener("click", ()=>{
    const query = document.getElementById('search-input').value.trim();
    if(!query) {
        alert("Please! Enter the search item..")
        return;
    }
    errors.textContent= '';
    cquery = query;
    cpage = 1;
    document.getElementById('img-cont').innerHTML = '';
    fetchImages(); 
})

lbtn.addEventListener("click",() => {
    cpage++;
    fetchImages();
})


const fetchImages = () => {
    fetch(`${url}?query=${cquery}&per_page=15&page=${cpage}&client_id=${key}`)

    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('img-cont')
        data.results.forEach(img => {
            const arc = document.createElement('a');
            arc.href = img.links.html;
            arc.target = '_blank';
            const image = document.createElement('img');
            image.src = img.urls.small;
            arc.appendChild(image);
            container.appendChild(arc);
        });

        if(data.results.length > 0){
            document.getElementById('loadcontainer').style.display = "block";
             document.getElementById('loadcontainer').style.display= "flex";
              document.getElementById('loadcontainer').style.justifyContent= "center";
        }
        else {
            errors.innerHTML = "<p>No images found. Try Different Search</p>";
            document.getElementById('loadcontainer').style.display = "none";
        }
    
        
    })
}