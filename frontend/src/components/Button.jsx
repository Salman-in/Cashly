export function Button({label, onPress}) {
    return <button onClick={onPress} type="button" className="w-max-fit text-white bg-gray-700 hover:bg-gray-900 hover:cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}
  