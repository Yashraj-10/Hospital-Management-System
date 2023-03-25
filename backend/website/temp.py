# current_user_id = 'DOC1'
# date = '2023-3-12'
# slot = '09001200,14001600'
# print("INSERT INTO doc_slots (doc_id, doc_slot, doc_date) VALUES ('"+current_user_id+"', '"+date+"','"+slot+"');")
# print("SELECT COUNT(*) FROM doc_slots WHERE doc_id = '"+current_user_id+"' AND doc_date = '"+date+"';")


from cv2 import perspectiveTransform


user_id = "DOC4"
if user_id.startswith('DOC'):
    print("hello")