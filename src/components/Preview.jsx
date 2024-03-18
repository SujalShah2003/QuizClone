import React, { useMemo, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { data } from "./data";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Preview = () => {
  const selectedList = useSelector((state) => state.user.selectedItem);
  console.log(selectedList, "Selected Data");

  const correctAnswer = data.map((item) => {
    return item.correct;
  });
  console.log("Correc answer", correctAnswer);
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="mt-14 w-[600px] h-[720px]  shadow-xl bg-white">
          <div className="bg-gray-500 w-full p-3 font-bold text-white tracking-widest	">
            <FaQuestionCircle className="absolute mt-1 text-lg" />
            <h1 className="ml-6">
              FAQ (Frequently Asked Question) <u>PREVIEW</u>{" "}
            </h1>
          </div>
          <div className="px-10">
            <form className="mb-3">
              {data?.map((item, inx) => (
                <>
                  <h1 className="font-bold mt-5">Q. {item.question}</h1>
                  <input
                    type="radio"
                    name="option1"
                    color="red"
                    id="checkedData"
                    checked={item.option1 === selectedList[inx] ? true : false}
                    value={item.option1}
                    className={`mt-2 ${selectedList[inx] === correctAnswer[inx] ? 'accent-green-500' : 'accent-red-500'}`}
                    disabled
                  />{" "}
                  {item.option1}
                  <br />
                  <input
                    type="radio"
                    id="checkedData"
                    checked={item.option2 === selectedList[inx] ? true : false}
                    value={item.option2}
                    disabled
                    className={`mt-2 ${selectedList[inx] === correctAnswer[inx] ? 'accent-green-500' : 'accent-red-500'}`}
                  />{" "}
                  {item.option2}
                  <br />
                  <input
                    type="radio"
                    id="checkedData"
                    checked={item.option3 === selectedList[inx] ? true : false}
                    value={item.option3}
                    className={`mt-2 ${item.option3 === correctAnswer[inx] ? 'accent-green-500' : 'accent-red-500'}`}
                    disabled
                  />{" "}
                  {item.option3}
                  <br />
                  <input
                    type="radio"
                    id="checkedData"
                    checked={item.option4 === selectedList[inx] ? true : false}
                    value={item.option4}
                    className={`mt-2 ${item.option4 ===  correctAnswer[inx] ? 'accent-green-500' : 'accent-red-500'}`}
                    disabled
                  />{" "}
                  {item.option4}
                  <br />
                </>
              ))}
            </form>
            <Link
              to="/"
              spy={true}
              smooth={true}
              className=" text-lg underline text-blue-500"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
