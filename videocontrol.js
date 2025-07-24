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

const observer = new IntersectionObserver((projects) => {
    for( let project of projects )
    {
            if (project.isIntersecting)
            {
                project.target.classList.add("focus");
            }
            else
            {
                project.target.classList.remove("focus");
            }
        }
    },
    {
    threshold: 0.5,
    });

for( let project of projects) 
{
    observer.observe(project);
}
