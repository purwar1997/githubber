import Skeleton from './Skeleton';
import './skeleton.css';

export default function SkeletonProfile() {
  return (
    <div className='skeleton-profile'>
      <Skeleton classes='left' />
      <Skeleton classes='right' />
    </div>
  );
}
