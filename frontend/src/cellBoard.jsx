import React, { useEffect, useRef, useState } from "react";
import { useAccount, useContractRead, useDisconnect } from "wagmi";
import cellAbi from "../cellAbi.json";
import { useNavigate } from "react-router-dom";
const CellBoard = () => {
  const { disconnect } = useDisconnect();
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();
  const initialState = {
    x: 1,
    y: 1,
  };
  const [state, setState] = useState(initialState);

  const { data, isError, isLoading } = useContractRead({
    address: "0x8C60282Df96310080Cc44a67eFA08351db205d56",
    abi: cellAbi.abi,
    functionName: "getColor",
    args: [state.x, state.y],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      x: xCoordinate.current.value,
      y: yCoordinate.current.value,
    });
  };
  console.log(data);

  const xCoordinate = useRef(null);
  const yCoordinate = useRef(null);

  if (isDisconnected) {
    navigate("/");
  }
  return (
    <>
      <div className="bg-slate-900 pb-8">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative">
            <div class="flex flex-col gap-y-5 justify-center mb-10">
              <h1 className="text-[#6A43ED] font-extrabold text-5xl">
                Color Hack
              </h1>
              <p className="text-white">
                <span className="font-bold text-[#6A43ED]">Instructions</span>:
                This board has 35 cells, each locatable by its respective x and
                y axis, your task is to input the x and y coordinates of your
                choice to reveal your color hack
              </p>
              <p className="text-white">
                <span className="font-bold text-[#6A43ED]">Rule:</span> <br />
                Do not input zero numbers <br />
                Do not input a value greater than 5 in X axis <br />
                Do not input a value greater than 7 in Y axis{" "}
              </p>
            </div>
            <div className="border-8 border-[#6A43ED] p-5">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-7 grid-rows-5 gap-3 ">
                  {[1, 2, 3, 4, 5].map((index1, y) =>
                    [1, 2, 3, 4, 5, 6, 7].map((index2, x) => {
                      return (
                        <div
                          key={index2}
                          className={`p-8 rounded-md cursor-pointer hover:bg-[#6A43ED] ${
                            index1 == state.x && index2 == state.y
                              ? data == 0
                                ? "bg-white"
                                : data == 1
                                ? "bg-black"
                                : data == 2
                                ? "bg-red-500"
                                : data == 3
                                ? "bg-blue-500"
                                : ""
                              : "bg-white/30"
                          }`}
                          onClick={() =>
                            setState({ ...state, x: index1, y: index2 })
                          }
                        ></div>
                      );
                    })
                  )}
                </div>
                <div className="flex justify-between mt-10 mb-4">
                  <div class="flex rounded-md shadow-sm">
                    <span class="px-4 inline-flex items-center min-w-fit rounded-l-md bg-gray-500 text-sm text-white font-bold">
                      X
                    </span>
                    <input
                      type="text"
                      ref={xCoordinate}
                      name="x"
                      class="py-2 px-3 pr-11 block w-full shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div class="flex rounded-md shadow-sm">
                    <span class="px-4 inline-flex items-center min-w-fit rounded-l-md bg-gray-500 text-sm text-white font-bold">
                      Y
                    </span>
                    <input
                      type="text"
                      ref={yCoordinate}
                      name="y"
                      class="py-2 px-3 pr-11 block w-full shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <p
                  className={`text-red-500 text-center my-3 ${
                    state.x > 5 || state.y > 7 ? "visible" : "hidden"
                  }`}
                >
                  X or Y is out of Bound!
                </p>
                <p
                  className={`text-red-500 text-center my-3 ${
                    state.x == 0 || state.y == 0 ? "visible" : "hidden"
                  }`}
                >
                  Zero number is not accepted
                </p>
                <button
                  type="submit"
                  class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#6A43ED] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reveal
                </button>
              </form>
            </div>
            <button
              onClick={disconnect}
              className="bg-blue-500 rounded-md hover:bg-[#6A43ED] text-white py-2 px-3 font-bold absolute top-0 right-0"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CellBoard;
