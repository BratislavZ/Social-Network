import { useCallback, useEffect, useRef, useState } from "react";

import { useAppSelector } from "../store/hooks/hooks";

type Job = {
  id: string;
  location: {
    display_name: string;
  };
  created: string;
  company: {
    display_name: string;
  };
  title: string;
  salary_min: string;
  salary_max: string;
  redirect_url: string;
};

const useJobs = () => {
  const jobsPageRefresh = useAppSelector((state) => state.page.jobs);
  const observer = useRef<IntersectionObserver | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");

  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) {
        observer.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPageNumber(1);
    setJobs([]);
    setLoading(true);
    setHasMore(false);
    setError("");
  }, [jobsPageRefresh]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchRequest = () => {
      fetch(
        `http://api.adzuna.com/v1/api/jobs/gb/search/${pageNumber}?app_id=${process.env.REACT_APP_JOB_API_ID}&app_key=${process.env.REACT_APP_JOB_API_KEY}&results_per_page=10`,
        { signal }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setError("");
          const jobsData = data.results.map((job: Job) => {
            return {
              id: job.id,
              location: {
                display_name: job.location.display_name,
              },
              created: job.created.substring(0, 10),
              company: job.company.display_name,
              title: job.title,
              minSalary: job.salary_min,
              maxSalary: job.salary_max,
              redirect_url: job.redirect_url,
            };
          });
          setJobs((prev) => (prev ? [...prev, ...jobsData] : jobsData));
          setHasMore(data.results.length > 0);
          setLoading(false);
        })

        .catch((err: any) => {
          setLoading(false);
          setHasMore(false);
          if (err.message !== "The user aborted a request.") {
            setError("Something went wrong.");
          }
        });
    };
    fetchRequest();

    return () => {
      controller.abort();
    };
  }, [pageNumber, jobsPageRefresh]);

  return { loading, jobs, lastCardRef, error };
};

export default useJobs;
