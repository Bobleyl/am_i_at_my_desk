import cv2

cap = cv2.VideoCapture(1)
result, image = cap.read()
face_cascade = cv2.CascadeClassifier('/Users/bobleyl/Desktop/BleylDev/Videos/CarDetection/assets/face_detection.xml')
person_found = False
count = 0

if not cap.isOpened():
    print("Cannot open camera")
    exit()
while True:
    ret, frame = cap.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if (count > 10):
        for (x, y, w, h) in faces:
            person_found = True
        cv2.imwrite("Images/UserFace.png", frame)
        break
    else:
        count += 1

if (person_found):
    print('true', flush=True)
else:
    print('false', flush=True)

cap.release()
cv2.destroyAllWindows()