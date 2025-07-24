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
    for( let entry of entries )
    {
            if (entry.isIntersecting)
            {
                entry.classList.add("focus");
            }
            else
            {
                entry.target.classList.remove("focus");
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
