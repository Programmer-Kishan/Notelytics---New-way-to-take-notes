
interface GeneralInputProps {
  label: string;
  type: string;
  name: string;
  stateVar?: boolean
  statefn ?: ()=>void
}

const GeneralInput = ({ label, type, name, stateVar, statefn }: GeneralInputProps) => {

  return (
    <div>
      <label className="bg-[#EAEAEA] font-poppins relative top-3 left-3">
        {label}
      </label>
      {(() => {
        switch (type) {
          case "textarea":
            return (
              <textarea
                name={name}
                rows={5}
                className="bg-transparent rounded-[4px] border-[#252A34] border-2 px-1 py-2 w-full font-poppins"
              ></textarea>
            );
          case "file":
            return (
              <div>
                {(() => {
                  switch (name) {
                    case "pdf":
                      return (
                        <input
                          type={type}
                          name={name}
                          accept=".pdf"
                          className="cursor-pointer file:text-red-600 file:px-2 file:py-3 file:font-poppins file:font-semibold file:border-0 file:outline-none file:bg-pink-200/60 file:rounded-lg file:mr-5 font-mono file:cursor-pointer text-lg"
                        />
                      );
                    case "image":
                      return (
                        <input
                          type={type}
                          name={name}
                          accept=".jpg"
                          className="cursor-pointer file:text-red-600 file:px-2 file:py-3 file:font-poppins file:font-semibold file:border-0 file:outline-none file:bg-pink-200/60 file:rounded-lg file:mr-5 font-mono file:cursor-pointer text-lg"
                        />
                      );
                    case "video":
                      return (
                        <input
                          type={type}
                          name={name}
                          accept=".mp4"
                          className="cursor-pointer file:text-red-600 file:px-2 file:py-3 file:font-poppins file:font-semibold file:border-0 file:outline-none file:bg-pink-200/60 file:rounded-lg file:mr-5 font-mono file:cursor-pointer text-lg"
                        />
                      );
                    default:
                      return <div>Unknown sub-mode</div>;
                  }
                })()}
              </div>
            );
          case "text":
            return (
              <input
                type={type}
                name={name}
                className="bg-transparent rounded-[4px] border-[#252A34] border-2 px-1 py-2 w-full font-poppins"
              />
            );
          case "radio":
            return (
              <div className="grid place-items-center justify-center cursor-pointer mt-[-9px]" onClick={statefn}>
                <input type={type} name={name} className="col-start-1 ml-20 row-start-1 h-5 w-5 shrink-0 appearance-none rounded-full border-2 border-[#FF2E63]"/>
                <div className={`col-start-1 ml-20 absolute row-start-1 h-3 w-3 rounded-full bg-[#FF2E63] ${stateVar ? "block" : 'hidden'}`}></div>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default GeneralInput;
