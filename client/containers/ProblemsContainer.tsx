
// 'use client'
// import { ProblemCard } from "@/components/ProblemCard";
// import { useProblem } from "@/hooks/useProblems";
// import React, { useEffect } from "react";


// const ProblemsContainer = () => {
//   const { allProblems } = useProblem();

//   const getAllProblems = async () => {
//     await allProblems.refetch();
//   };

//   useEffect(() => {
//     getAllProblems();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {allProblems.data?.data.map((problem, index) => (
//         <ProblemCard key={problem.uuid} {...problem} index={index} />
//       ))}
//     </div>
//   );
// };

// export default ProblemsContainer;
