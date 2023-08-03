import { SVGProps, Ref, forwardRef, memo } from "react";
const ChevronUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_9209_3250)">
      <path
        d="M9.77084 7.25705C9.77107 7.37388 9.73039 7.4871 9.65584 7.57705C9.61387 7.62768 9.56232 7.66953 9.50415 7.70021C9.44597 7.73089 9.38232 7.74978 9.31683 7.75582C9.25134 7.76186 9.18531 7.75492 9.1225 7.7354C9.0597 7.71588 9.00137 7.68416 8.95084 7.64205L6.27084 5.40205L3.58584 7.56205C3.5347 7.60359 3.47585 7.6346 3.41268 7.65332C3.34951 7.67203 3.28327 7.67808 3.21775 7.67111C3.15224 7.66414 3.08875 7.64429 3.03093 7.61271C2.97311 7.58112 2.92211 7.53842 2.88084 7.48705C2.83533 7.43532 2.80099 7.37474 2.78 7.30911C2.759 7.24348 2.7518 7.17421 2.75884 7.10567C2.76589 7.03712 2.78702 6.97077 2.82092 6.91078C2.85482 6.85079 2.90076 6.79845 2.95584 6.75705L5.95584 4.34205C6.04531 4.26851 6.15753 4.22831 6.27334 4.22831C6.38916 4.22831 6.50138 4.26851 6.59084 4.34205L9.59084 6.84205C9.65135 6.89221 9.69918 6.95593 9.73046 7.02803C9.76173 7.10014 9.77557 7.1786 9.77084 7.25705Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_9209_3250">
        <rect width={12} height={12} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(ChevronUp);
const Memo = memo(ForwardRef);

export default Memo;
