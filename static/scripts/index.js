async function get_files(location, type="text"){
    if (type == "text"){
        return fetch("/file?file=" + location +"&type=text")
        .then(response => response.text())
        .then(data => {
            return data
        })
    }
    else if (type == "image"){
        return fetch("/file?file=" + location + "&type=file")
        .then(response => response.blob())
        .then(imageBlob => {
            return URL.createObjectURL(imageBlob);
        })
    }
}
async function get_project_selector(){
    document.getElementById("content").innerHTML = await get_files("/html/project_selector.html")
    document.querySelectorAll(".push-button").forEach((el) => {
        el.addEventListener("click", click_down_animation, false)
    })
}
get_project_selector()


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelectorAll(".push-button").forEach((el) => {
    el.addEventListener("click", click_down_animation, false)
})

function click_down_animation(e){
    
    background_color = window.getComputedStyle(e.target).color
    e.target.classList.remove("push-button-hover")
    e.target.classList.add("push-down")
    spawn = document.createElement("div")
    spawn.style.position = "absolute"
    selected_color = window.getComputedStyle(e.target).color
    spawn.style["background-color"] = window.getComputedStyle(e.target).color
    console.log(window.getComputedStyle(e.target).backgroundColor)
    spawn.style.width = String(parseInt(e.target.offsetWidth) / 5) + "px"
    spawn.style.height = String(parseInt(e.target.offsetWidth) / 5) + "px"
    spawn.style["top"] = String(parseInt(getOffset(e.target).top + (parseInt(e.target.offsetHeight)/2) - 40)) + "px"
    spawn.style.left = String(parseInt(getOffset(e.target).left + (parseInt(e.target.offsetWidth)/2) - 40)) + "px"
    spawn.style.borderStyle = "solid"
    spawn.style["border-color"] = window.getComputedStyle(e.target).color
    spawn.style.borderWidth = "10px"
    spawn.style["border-radius"] = "10px"
    spawn.style["transition-duration"] = "0.3s"
    spawn.classList.add("expand")
    current_selector = e.currentTarget.id
    
    setTimeout(wipe_screen, 100)
    function wipe_screen(){
        document.getElementById("content").append(spawn)
        setTimeout(add_info, 1000)
        async function add_info(){
            document.getElementById("content").style["background-color"] = background_color

            discription = await get_files("/discriptions/" + current_selector + ".txt")
            image = await get_files("/gifs/" + current_selector + ".mov", type="image")
            document.getElementById("content").innerHTML = await get_files("/html/project_info.html")
            document.getElementById("discription-video").src = image
            document.getElementById("discription-project").innerHTML = discription
            try{
                document.querySelectorAll(".here-text").forEach(function (e) {
                    e.style["color"] = selected_color
                })

            }
            catch{
                x=0
            }
            document.getElementById("project-title").innerHTML = titleCase(current_selector.replace("-", " "))
            document.getElementById("project-title").style["color"] = selected_color
        }
    }
}
