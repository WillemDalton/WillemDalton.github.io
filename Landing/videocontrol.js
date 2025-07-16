let projects = document.querySelectorAll(".project")

addEventListener("mousemove", (event) => {
    for( let project of projects) 
    {
        let video = project.querySelector('video')
    
        if(project.matches(':hover'))
        {
            video.play();
        }
        else
        {
            video.pause()
        }
    }
})