import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
    try {
        if (serviceAccount.privateKey) {
            initializeApp({
                credential: cert(serviceAccount),
            });
        } else {
            console.warn("Firebase Private Key not found. Skipping initialization.");
        }
    } catch (error) {
        console.warn("Firebase initialization failed (likely due to invalid credentials in build). Using mock.", error);
    }
}

// Export a mock or the real instance
export const db = getApps().length ? getFirestore() : {
    collection: () => ({
        doc: () => ({
            set: async () => { },
            get: async () => ({ exists: false, data: () => ({}) }),
        }),
        add: async () => ({ id: 'mock-id' }),
    }),
} as any;

// Save ritual result to Firestore
export async function saveResult(data: {
    email: string;
    name: string;
    userData: any;
    results: any;
    createdAt: string;
}): Promise<string> {
    console.log('saveResult called with data:', { email: data.email, name: data.name, createdAt: data.createdAt });
    console.log('Firebase initialized:', getApps().length > 0);
    console.log('Firebase env vars check:', {
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    });

    // Check if we're using mock db
    const isMockDb = !getApps().length || !process.env.FIREBASE_PRIVATE_KEY;
    if (isMockDb) {
        console.warn('Using mock Firestore - Firebase not properly configured');
        console.warn('Required env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
        const mockId = 'mock-' + Date.now();
        console.log('Returning mock ID:', mockId);
        return mockId;
    }

    try {
        console.log('Attempting to save to Firestore...');
        const docRef = await db.collection('results').add(data);
        console.log('Successfully saved to Firestore with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving to Firestore:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        // Return mock ID if Firestore fails
        const mockId = 'mock-' + Date.now();
        console.log('Returning mock ID due to error:', mockId);
        return mockId;
    }
}
