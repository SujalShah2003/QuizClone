import React, { useMemo, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { data } from "./data";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  correctedAnswer,
  currentSteped,
  indexed,
  prevClick,
  scored,
  selectedData,
} from "../features/userSlice";
import { Link } from "react-router-dom";

const FormDesign = () => {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const steps = ["Question 1", "Question 2", "Question 3", "Question 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const selectedList = useSelector((state) => state.user.selectedItem);

  const correctAnswer = data.map((item) => {
    return item.correct;
  });

  const dispatch = useDispatch();

  let demodata = useMemo(() => {
    return [data[index]];
  }, [index]);

  const { register, handleSubmit, formState, watch, setValue } = useForm();
  const { errors } = formState;

  console.log(watch("answer"), "sujal");
  console.log("Score :: ", score);
  console.log("items selected :: ", selectedList);
  console.log("SELECTED DATA REDUX", watch("answer"));

  const onSubmit = () => {
    if (watch("answer") === correctAnswer[currentStep - 1]) {
      setScore(score + 10);
    }

    dispatch(
      selectedData(watch("answer")),
      correctedAnswer({
        correct: correctAnswer,
      }),
      scored({
        score: score,
      })
    );

    setValue("answer", "");

    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => prev + 1);

    setIndex((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      }
      return prev;
    })`1  |`;

    dispatch(
      indexed({
        index: index,
      }),
      currentSteped({
        currentStep: currentStep,
      })
    );
  };

  const handleRestartClick = () => {
    // console.log('Clicked');
    setComplete(false);
    setIndex(0);
    setScore(0);
    // setSelectedItem("");
    setValue("answer", "");
    setCurrentStep(1);
  };

  const handlePreviousClick = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          return prev;
        });

    setValue("answer", selectedList[selectedList.length - 1]);
    dispatch(prevClick());

    setIndex((prev) => {
      if (prev < data.length - 1) {
        return prev - 1;
      }
      return prev;
    })`1 |`;
  };
  console.log("Current step", currentStep);
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="mt-32 w-[600px] h-[550px]  shadow-xl bg-white">
          <div className="bg-gray-500 w-full p-3 font-bold text-white tracking-widest	">
            <FaQuestionCircle className="absolute mt-1 text-lg" />
            <h1 className="ml-6">FAQ (Frequently Asked Question)</h1>
          </div>
          <div className="p-10">
            <div className="flex justify-between">
              {steps?.map((step, i) => (
                <div
                  key={i}
                  className={`step-item ${currentStep === i + 1 && "active"} ${
                    (i + 1 < currentStep || complete) && "complete"
                  } `}
                >
                  <div className="step">
                    {i + 1 < currentStep || complete ? (
                      <TiTick size={24} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p className="text-gray-500">{step}</p>
                </div>
              ))}
            </div>
            {!complete && (
              <h1 className="mt-7 font-bold">
                <span className="text-2xl">»</span> Answer the Following
                Question (Each Correct answer will give you 10 points) :
              </h1>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {!complete &&
                demodata?.map((item) => (
                  <>
                    <h1 className="font-bold mt-7">Q. {item.question}</h1>
                    <input
                      type="radio"
                      name="option1"
                      checked={item.option1 === watch("answer") ? true : false}
                      value={item.option1}
                      {...register("answer", {
                        required: {
                          value: true,
                          message: "Please Select any Option",
                        },
                      })}
                      className="mt-4 text-red-500"
                    />{" "}
                    {item.option1}
                    <br />
                    <input
                      type="radio"
                      id="option2"
                      checked={item.option2 === watch("answer") ? true : false}
                      value={item.option2}
                      {...register("answer", { required: true })}
                      className="mt-4"
                    />{" "}
                    {item.option2}
                    <br />
                    <input
                      type="radio"
                      id="option3"
                      checked={item.option3 === watch("answer") ? true : false}
                      value={item.option3}
                      {...register("answer", { required: true })}
                      className="mt-4"
                    />{" "}
                    {item.option3}
                    <br />
                    <input
                      type="radio"
                      id="option4"
                      checked={item.option4 === watch("answer") ? true : false}
                      value={item.option4}
                      {...register("answer", { required: true })}
                      className="mt-4"
                    />{" "}
                    {item.option4}
                    <br />
                    <input
                      type="button"
                      value="Previous"
                      disabled={currentStep == 1 ? true : false}
                      className="p-2 mr-5 outline w-20 outline-1 outline-gray-500  mt-7 rounded-lg text-gray-500 hover:bg-gray-500 hover:text-white"
                      onClick={handlePreviousClick}
                    />
                    <input
                      type="submit"
                      value="Next"
                      disabled={demodata.length > 0 ? false : true}
                      className="p-2 mr-5 outline outline-1 w-20 outline-blue-500  mt-4 rounded-lg text-white bg-blue-500 hover:bg-blue-700 hover:text-white"
                    />
                  </>
                ))}
            </form>
          </div>
          {complete && (
            <>
              <div className="p-4 m-5 outline outline-1 rounded-lg outline-green-700  bg-green-300">
                <TiTick className="absolute text-2xl " />
                <p className="ml-7 font-bold ">
                  Congratulations!!! You have Successfully Answer all the
                  Questions
                </p>
              </div>
              <div className="p-4 m-5 mt-10 outline outline-1 rounded-lg outline-gray-700 text-gray-700 bg-gray-300">
                <h1>Your Score : {score}</h1>
              </div>

              <button
                className="m-7 bg-blue-500 rounded-lg w-20 text-white font-bold p-2"
                onClick={handleRestartClick}
              >
                Restart
              </button>
              <Link to="/preview" spy={true} smooth={true} className="underline text-blue-500">Preview your Data</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormDesign;
