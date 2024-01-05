export default function SkeletonCheckOutForm() {
    return (
        <section className="w-full md:w-1/3 px-4 p-2">
            <div className="max-w-sm animate-pulse">
                <div className="pt-2">
                    <div className="h-10 bg-brand-cream rounded-full dark:bg-brand-brown w-40 mb-4"></div>
                </div>
                <div className="pt-2 pb-4">
                    <div className="h-1 bg-brand-cream rounded-full dark:bg-brand-brown mb-2.5"></div>
                </div>
                <div className="pb-4">
                    <div className="h-4 bg-brand-cream rounded-full dark:bg-brand-brown max-w-[200px] mb-2.5"></div>
                    <div className="h-10 bg-brand-cream rounded-full dark:bg-brand-brown mb-2.5"></div>
                </div>
                <div className="pb-4">
                    <div className="h-4 bg-brand-cream rounded-full dark:bg-brand-brown max-w-[180px] mb-2.5"></div>
                    <div className="h-12 bg-brand-cream rounded-full dark:bg-brand-brown mb-2.5"></div>
                </div>
                <div className="pb-4">
                    <div className="h-14 bg-brand-cream rounded-full dark:bg-brand-brown mb-2.5"></div>
                </div>
            </div>
        </section>
    );
}
