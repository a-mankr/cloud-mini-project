import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    qno: {
      type: Number,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: [
      {
        id: {
          type: Number,
          required: true
        },
        option: {
          type: String,
          required: true
        }
      }
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
);

questionSchema.index({ qno: 1 }, { uniques: true });

export const Question = mongoose.model('question', questionSchema);
