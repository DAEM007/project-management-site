import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Config";
import { Project } from "../pages/project/ProjectData";

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  // get realtime updates for each documents
  useEffect(() => {
    const docRef = doc(db, collection, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        // check if document exists & has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id } as Project);
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document!");
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [collection, id]);

  return { document, error };
};

export default useDocument;
