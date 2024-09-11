const OpportunitiesRoles = [
    {
        name: "Intern",
        icon: "",
        description: ""
    },

    {
        name: "Team Lead",
        icon: "",
        description: ""
    },

    {
        name: "Cues - Advanced Team",
        icon: "",
        description: ""
    },

    {
        name: "Committee Position",
        icon: "",
        description: ""
    },
]

const style = "flex items-center p-7 h-[170px] relative font-bold text-center rounded-lg bg-[#151515] text-white ring-1 ring-dark-primary ring-inset";

const OpportunitiesItems = OpportunitiesRoles.map(role =>
    <div className="flex-auto w-[50%] p-7">
        <div className="relative group">
            <div
                className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300"
            ></div>
            <div className={style}>
                <span className="flex h-full">
                    <h1 className="text-lg">{role.name}</h1>
                </span>
            </div>

        </div>

    </div>
)

const OpportunitiesInfo = () => {
    return (
        <div className="text-white p-4">
            <div className="flex flex-wrap flex-col justify-center">
                <div className="rounded md:mx-20 my-4">
                    <section className="md:w-3/4 mx-auto">
                        <p className="text-lg p-6 opacity-90">
                            As a Code Coogs Intern you would be working hand in hand with either a VP or a Director assisting them and providing your input on club's work. You will also have the opportunity to attend officer socials and contribute to the club at a higher level.
                        </p>
                    </section>
                </div>

                <div className="rounded md:mx-20">
                    <section className="md:w-8/12 mx-auto">
                        <div className="flex flex-wrap p-6">
                            {OpportunitiesItems}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default OpportunitiesInfo