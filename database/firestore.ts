import { DocumentData, PartialWithFieldValue, QueryDocumentSnapshot, collection } from 'firebase/firestore';
import firestoreDB from './firebase';
import { User } from '@/types';

const converter = <T>() => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data as DocumentData,
    fromFirestore: (snap: QueryDocumentSnapshot<T>) => 
      snap.data()
});

const dataPoint = <T extends DocumentData>(collectionPath: string) => {
    return collection(firestoreDB, collectionPath).withConverter(converter<T>());
};

const db = {
    users: dataPoint<User>('users')
};

export default db;