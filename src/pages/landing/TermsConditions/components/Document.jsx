import { LuArrowRight, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";

const about = [
    "Extremely impressed with the service and the outcomes!",
    "Outstanding service for precision-targeted lead generation.",
    "I've thoroughly enjoyed my collaboration with Resonance.",
];

const TermsAndConditions = () => {
    return (
        <section id="terms" className="py-10 lg:py-20">
            <div className="container">
                <div className="max-w-xl mx-auto text-center mb-14">
                    <span className="py-1 px-3 rounded-md text-xs font-medium uppercase tracking-wider border border-primary bg-primary/20 text-primary">
                        Terms and Conditions
                    </span>
                    <h2 className="text-4xl/tight font-medium text-default-950 mt-4">
                        Terms and Conditions of Our Services
                    </h2>
                    <p className="text-base mt-5">
                        By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
                    </p>
                </div>
                <div className="border border-default-200 rounded-xl">
                    <div className="grid lg:grid-cols-3 grid-cols-1 items-center divide-y lg:divide-y-0 lg:divide-x divide-default-200">
                        {about.map((item, idx) => {
                            return (
                                <div key={idx} className="text-center p-8">
                                    <h5 className="text-xl font-medium text-default-950">
                                        "{item}"
                                    </h5>
                                    <p className="text-lg text-default-950 mt-4">
                                        Rated 4.5 on Trustpilot
                                    </p>
                                    <div className="flex items-center justify-center gap-1 mt-5">
                                        {Array.from(new Array(5)).map((_val, idx) => {
                                            return (
                                                <LuStar
                                                    key={idx}
                                                    className="h-6 w-6 text-yellow-300 fill-yellow-300"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <Link
                        to=""
                        className="inline-flex items-center justify-center gap-2 border border-default-200 hover:border-primary backdrop-blur-3xl text-default-950 py-2 px-8 rounded-md hover:bg-primary hover:text-white transition-all"
                    >
                        Read More
                        <LuArrowRight className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
