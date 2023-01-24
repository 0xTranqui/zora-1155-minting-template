import ThumbnailCard from "../elements/display/ThumbnailCard"

export default function MainFeed() {

    return (
        <section id="main-feed" className='py-6 text-[18px] grid grid-cols-1 h-full w-[75%] border-[1px] border-gray-400 gap-4 justify-center'>
            <div className="flex flex-row justify-center ">
                <ThumbnailCard />
            </div>
        </section>
    )
}