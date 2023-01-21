const btn = document.getElementById("button"),
btnText = btn.querySelector("span"),
info = document.getElementById("info");
function success(p) {
    let {latitude, longitude} = p.coords
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=fbb328bdebfb422f91b9274c6416ac90`)
        .then(res => res.json())
        .then(res => {
            const conp = res.results[0].components
            info.innerHTML = `
            <p>Continente: ${conp.continent}</p>
            <p>País: ${conp.country}</p>
            <p>Codigo postal: ${conp.postcode}</p>
            <p>Estado: ${conp.state}</p>
            <p>Ciudad: ${conp.town}</p>
            <p>Calle: ${conp.road}</p>
            `
            btnText.textContent = "Datos cargados" 
        })
}
function error(e) {
    btnText.textContent = "Algo anda mal" 
    info.innerHTML = ""
}

btn.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
    }else{
        btnText.textContent = "Navegador incompatible"
    }
});