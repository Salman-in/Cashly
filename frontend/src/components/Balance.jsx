export const Balance = ({ value }) => {
    return (
        <div className="px-8 py-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 block max-w-fit">
            <div className="text-sm font-bold text-slate-600">
                Available Balance
            </div>

            <div className="text-2xl font-semibold text-black font-poppins">
                Rs. {value}
            </div>
        </div>
    );
}
