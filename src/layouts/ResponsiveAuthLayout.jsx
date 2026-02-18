

export default function ResponsiveAuthLayout({ children, title }) {
    return (

        <div className="min-h-screen m-8 bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-4xl flex flex-col items-center">

                <div className="w-full bg-gray-200 rounded shadow-lg z-0 mt-16 p-4">
                    <h2 className="text-center md:text-lg lg:text-3xl font-extrabold text-gray-900">{title}</h2>
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {children}

                    </div>
                </div>
            </div>
        </div>


    )
}